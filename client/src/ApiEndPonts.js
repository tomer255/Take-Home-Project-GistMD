const protocol = "http"
const addresses = "localhost"
const port = 5000

const server = `${protocol}://${addresses}:${port}`

const API = {
    patient : {
        getPatients : server+"/patient/getPatients",
        addPatient : server+"/patient/addPatient",
        deletePatient:server+"/patient/deletePatient",
        editPatient:server+"/patient/editPatient",
    },
    fields:{
        getFields:server+"/fields/getFields",
    }
}

export default API