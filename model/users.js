module.exports = function(sequlize, DataTypes){
    return sequlize.define('users',{
        idx: {                                      
            type: DataTypes.INTEGER,
            autoIncrement: true,        //자동생성
            primaryKey:true,
            allwNull:false
        },
        user_id:{
            type:DataTypes.STRING(250)
        }
    })
}