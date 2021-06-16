import React from "react";
import {Button, Grid} from "@material-ui/core";
import * as d3 from 'd3';
import Tree from 'react-d3-tree';
import './TreeStyle.css';
import studyprogram from "./data";
import {useHistory} from "react-router-dom";


const tree = {
    name: 'CEO',
    children: [
        {
            name: 'Manager',
            attributes: {
                department: 'Production',
            },
            children: [
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Fabrication',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Assembly',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
            ],
        },
    ],
};

const Point = {x:100, y:100};

export default function InteractiveTree() {
    return (
        <Grid id="treeWrapper" style={{ width: '100em', height: '50em'}}>
            <Tree data={studyprogram}
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
            initialDepth={1}
            translate={Point}/>


        </Grid>


    );

}


