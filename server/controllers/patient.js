

module.exports.getPatients = async (req, res) => {
    const sql = "SELECT * FROM patients"
    db.query(sql, async (error, results) => {
      if(error) return res.status(500).send("An error occurred");
      return res.status(200).json(results);
    });
}



module.exports.addPatient = async (req, res) => {
    const {data} = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const sql = "INSERT INTO patients (??) VALUES (?);"
    db.query(sql,[keys,values],async (error, results)=>{
    if(error) return res.status(500).send("An error occurred");
    return res.status(200).send("Patient added successfully");
    })
}

module.exports.editPatient = async (req, res) => {
    const {id,data} = req.body;
    console.log(id)
    console.log(data)
    let parameters = []
    let sql = "UPDATE patients SET "
    Object.entries(data).forEach(([key,value]) => {
        sql += "?? = ? ,"
        parameters = [...parameters,key,value]
    })
    sql = sql.slice(0, -1) + "WHERE id = (?);"
    parameters = [...parameters,id]
    db.query(sql,parameters,async (error, results)=>{
        if(error) {return res.status(500).send("An error occurred");}
        return res.status(200).send("Patient update successfully");
        })
}

module.exports.deletePatient = async (req, res) => {
    const {id} = req.body;
    const sql = "DELETE FROM patients WHERE id=(?);"
    db.query(sql,[id],async (error, results)=>{
    if(error) {return res.status(500).send("An error occurred");}
    return res.status(200).send("Patient removed successfully");
    })
}