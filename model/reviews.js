module.exports = function(sequlize, DataTypes){
    return sequlize.define('reviews',{
        idx: {                                      
            type: DataTypes.INTEGER,
            autoIncrement: true,        //자동생성
            primaryKey:true,
            allwNull:false
        },
        movie_id:{
            type:DataTypes.STRING(250)
        },
        review:{
            type:DataTypes.TEXT         //긴 장문의 글을 넣을 때
        }
    })
}