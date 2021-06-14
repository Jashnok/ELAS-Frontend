import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
});

const select = (props) => {
    const selectedsubjects = []
    selectedsubjects.push(props);
    console.log(selectedsubjects);
}

function StudyprogramTree(props) {
    const studycategorie = props.studyprogram.categories;
    const study = props.studyprogram;
    console.log(study);
    console.log(props.studyprogram);


    const studysubjects = [];
    const studysemester = [];
    const studytype = [];
    for(const [key, value] of Object.entries(props.studyprogram.categories)){
        for(const [key2, value2] of Object.entries(studycategorie[key].subjects)){

            studysubjects.push(value2);

            for(const[key3, value3] of Object.entries(studysubjects[key2].semesters)){
                studysemester.push({[studysubjects[key2].name]: value3});
                studytype.push({[studysubjects[key2].name]: studysubjects[key2].subject_type});
            }
        }
    }
    console.log(studytype);
    console.log(studysemester);
    console.log(studysubjects);


    const classes = useStyles();

    const renderTree = (nodes) => (
        <TreeItem key={nodes.url} nodeId={nodes.url} label={nodes.name} >
            {Array.isArray(nodes.categories)  ?nodes.categories.map((node) => renderTree(node))  : null }
            {Array.isArray(nodes.subjects) ? nodes.subjects.map((node) => renderTree(node)): null }
        </TreeItem>

    );

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultEndIcon={<ChevronRightIcon/>}
            defaultExpanded={[props.studyprogram]}
            defaultExpandIcon={<ChevronRightIcon />}

        >
            {renderTree(study)}

        </TreeView>
    );
}
export default StudyprogramTree;