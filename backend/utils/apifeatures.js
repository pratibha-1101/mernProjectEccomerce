//i m making this page for searching and sorting the pages


class ApiFeatures {

    //constructor to check the queries in URLs
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }


    //for searching
    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,    //using mongodb $regex method
                    $options: "i",                   //using for case insensitiveness, means use either capital or small letter at searching.
                },
            }
            : {};
        // console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }


    filter() {
        //firstly ,querycopy reads all the querystr and get the data
        const queryCopy = { ...this.queryStr };

        //secondly,Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        // because this is an array so,using "foreach loop" here!
        // and removing all these fields from querycopy
        removeFields.forEach((key) => delete queryCopy[key]);

        // Filter For Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        //because of using dollar in mongo db i used below line
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        // console.log(queryStr);

        return this;
    }


    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}




module.exports = ApiFeatures;
