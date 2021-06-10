import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function SemesterSelec () {
    
    const semesters = [
        { semester: 'Wintersemester 2018/2019'},
        { semester: 'Sommersemester 2019'},
        { semester: 'Wintersemester 2019/2020'},
        { semester: 'Sommersemester 2020'},
        { semester: 'Wintersemester 2020/2021'},
        { semester: 'Sommersemester 2021'},
    ];
    
    
    return (

        <Autocomplete
            id="semester-selection"
            options={semesters}
            getOptionLabel={(option) => option.semester}
            style={{width:400}}
            renderInput={(params) => <TextField {...params} label= "Select your Semester" variant="outlined"/> }
            />

    )
}
