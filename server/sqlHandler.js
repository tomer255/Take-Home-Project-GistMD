const dotenv = require("dotenv");
dotenv.config()
const {Fields} = require("./config.json")
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const convertTypes = (type) =>{
    switch(type) {
        case "TextBox":
        case "Select":
            return "varchar"
        case "Number":
            return "int"
        default:
            return "varchar"
      }
}


const sqlHandler = async (cb)=>{
    const myFilds = Object.entries(Fields).map(([key, field])=>({ COLUMN_NAME: key, DATA_TYPE: convertTypes(field.type) }))
    const dbFilds = await getFilds()

    const mismatchedAndMissingFields = myFilds.filter(myFild=>dbFilds.find(dbFild=>dbFild.COLUMN_NAME===myFild.COLUMN_NAME)?.DATA_TYPE!==myFild.DATA_TYPE)
    const missingFields = mismatchedAndMissingFields.filter(myFild=>!dbFilds.map(dbFild=>dbFild.COLUMN_NAME).includes(myFild.COLUMN_NAME))
    await handleMissingFields(missingFields)
    
    const mismatchedFields = mismatchedAndMissingFields.filter(myFild => !missingFields.includes(myFild))
    // console.log("\nmismatchedFields");
    // console.log(mismatchedFields);
    cb()
}

const readLineAsync = (message) => {
    return new Promise((resolve, reject) => {
      rl.question(message, (answer) => {
        resolve(answer);
      });
    });
  } 

const handleMissingFields = async (fields)=>{
    if(fields.length){
        console.log("The following Fields ar not in the DB");
        console.log(fields);
        const anser = await readLineAsync("Do you want to add the following missing Fields? [Y/N] ")
        if(anser=="Y"){
            fields.forEach(field => {addMissingColumn(field.COLUMN_NAME,field.DATA_TYPE)});
        }
    }
}

const getFilds = ()=>{
    const sql = `
    SELECT COLUMN_NAME , DATA_TYPE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE 
        TABLE_SCHEMA = (?)
        AND TABLE_NAME = (?)
        AND COLUMN_NAME NOT IN (?);
    `
    const ignore = ["id"]
    const tableName = "patients"
    const parameters = [process.env.DB_NAME, tableName, ignore]
    return new Promise(async(res,rej)=>{
        db.query(sql,parameters, (error, results) => {
            if (error) rej(error)
            res(results)
        });
    })
    
}

const addMissingColumn = (columnName,dataType)=>{
    dataType = dataType === 'varchar' ? 'varchar(45)' : dataType;
    const sql = `
        ALTER TABLE ??
          ADD ?? ${dataType} NULL;
    `
    const tableName = "patients";
    const parameters = [tableName,columnName,dataType]
    db.query(sql,parameters, (error, results) => {
        if (error) return console.log(error);
        console.log(`column ${columnName} ${dataType} added to database`);
    });
}

module.exports =  {sqlHandler}