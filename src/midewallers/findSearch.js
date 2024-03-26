const { populate } = require("../models/userModel")


module.exports = (req,res,next)=>{

const filter = req.query?.filter || {}
const search = req.query?.search || {}

for(let key in search) search[key]= {$regex:search[key],$options:'i'}  //to make the

//siralama
const sort = req.query?.sort || {}
let limit = Number(req.query?.limit)
limit = limit > 0 ? limit :Number(process.env.PAGE_SIZE || 20)

let page = Number(req.query?.page)
page = page > 0 ? (page-1) : 0

let skip = Number(req.body?.skip)
skip = skip > 0 ? skip : (page*limit)

res.getModel= async(Model,filter,populate=null)=>{
    return await Model.find({...filter,...search}).sort(sort).skip(skip).limit(limit).populate(populate)
}
res.getModelDetails = async (Model, customFilter = {}) => {

    const data = await Model.find({ ...filter, ...search, ...customFilter })

    let details = {
        filter,
        search,
        sort,
        skip,
        limit,
        page,
        pages: {
            previous: (page > 0 ? page : false),
            current: page + 1,
            next: page + 2,
            total: Math.ceil(data.length / limit)
        },
        totalRecords: data.length,
    }
    details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
    if (details.totalRecords <= limit) details.pages = false
    return details
}

next()

}






// try{

//     const {keyword,min_price,max_price,taxonomy_id,page} =req.body
//     if(page <=0) page =1
//     let query ={};
//     keyword ? query.title = new RegExp(keyword,i) :null
//     min_price ? query.price ={['$gte'] : min_price} : null
//     max_price ? query.price ={['$gte'] : max_price} :null
//     min_price && max_price ? query.price ={['$gte'] : min_price ,['$gte'] : max_price} :null
//     taxonomy_id ?query.taxonomy_id = taxonomy_id : null
//    const products =await Products.find(query).limit(20).skip((page-1)*20) //sayfa gecisini  skiple
   
//    res.status(200).json({
//        message : 'sucess',
//        data: products
//    })