export class ApiFeature {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  //========= pagination =========
  pagination() {
    let PAGE_NUMBER = this.queryString.page;
    PAGE_NUMBER = PAGE_NUMBER * 1 || 1;
    this.PAGE_NUMBER = PAGE_NUMBER;
    if (PAGE_NUMBER <= 0 || !PAGE_NUMBER) PAGE_NUMBER = 1;
    const LIMIT = 5;
    let skip = (PAGE_NUMBER - 1) * LIMIT;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(LIMIT);
    return this;
  }
  //========= sort =========
  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }

  //========= search =========
  search() {
    if (this.queryString.ketword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  //========= fields =========
  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }

  //========= filter =========
  filter() {
    let filterObj = { ...this.queryString };
    let exclududQuery = ["page", "fields", "sort", "keywords"];
    exclududQuery.forEach((q) => {
      delete filterObj[q];
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }
}
