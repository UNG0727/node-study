module.exports = function(sequlize, DataTypes){
    return sequlize.define('test',{
        idx: {                                      
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allwNull:false
        },
        test_id:{
            type:DataTypes.STRING(250)
        }
    })
}