import MaterialTable from "material-table";

const data = [
     {name : "Siva" , surname : "prasad" , year : 1997},
     {name : "Nikhil" , surname : "B" , year : 1993},
]

const columns = [
     {title : 'Name' , field : "name"},
     {title : 'Surname' , field : "surname"},
     {title : 'Year' , field : "year" , type : 'numeric'}
]

export const BasicTable = () => {
     return <MaterialTable title='Basic Table' columns={columns} data={data} />
}