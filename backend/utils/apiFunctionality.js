class APIFunctionality{
    constructor(query, queryStr){
        this.query=query;//query is the mongoose query like Product.find()
        this.queryStr=queryStr; //quert str is the words after ? marking in the url
    }
  search(){
    const keyword=this.queryStr.keyword ? {
       name:{
            $regex:this.queryStr.keyword,
            $options:"i",
    },
    }:{};
    console.log(keyword);
    this.query=this.query.find({...keyword});
    return this;
}
filter(){
    const queryCopy={...this.queryStr}; //copying query str to query copy
    //console.log(queryCopy);
    const removeFields=["keyword","page","limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    this.query=this.query.find(queryCopy);
    return this;
    //console.log(queryCopy);
}
pagination(resultPerPage){
    //console.log(resultPerPage);
    const currentPage=Number(this.queryStr.page) || 1;
    const skip=resultPerPage * (currentPage - 1);
    this.query=this.query.limit(resultPerPage).skip(skip);
    return this;;
}
}
export default APIFunctionality;