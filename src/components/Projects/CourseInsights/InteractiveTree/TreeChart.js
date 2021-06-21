import React from 'react';
import Tree from 'react-d3-tree';
import testdata from './testdata';
import category from './category';

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: 'Master Richtung Maschinenbau und Wirtschaft',
  children: [
    {
      name: 'Energie- und Verfahrenstechnik',
      children: [
        {
          name: 'Pflichtfächer',
          children: [
            {
              name: 'Einführung in die Wirtschaftspolitik',
            },
            {
              name: 'Industrieökonomik',
            },
            {
              name: 'Nanotechnologie für Maschinenbauer und Verfahrenstechniker',
            },
            {
              name: 'Thermische Verfahrens- und Prozesstechnik',
            },
            {
              name: 'Übung zu Industrieökonomik',
            },
            {
              name: 'Verbrennungsmotoren',
            },

          ],
        },
        {
          name: 'Vertiefungsfächer',
          children: [
            {
              name: 'Aerosoltechnik',
              children: [ {
                name: 'Chemische Thermodynamik'
              },
              {
                name: 'Numerics and Flow Simulation'
              },
              {
                name: 'Adsorptionstechnik'
              },
              {
                name: 'Nanopartikel-Entstehungsvorgänge'
              },
              {
                name: 'Quantitative bildgebende Messtechniken in Strömungen'
              },
              ]
            },
            {
              name: 'Regenerative Energietechnik und effiziente Energiewandlung',
              children: [ {
                name: 'Brennstoffzellensysteme in der dezentralen Energieversorgung'
              },
              {
                name: 'Gasturbinen'
              },
              {
                name: 'Praktikum Energietechnik'
              },
              {
                name: 'Regenerative Energietechnik 2'
              },
              {
                name: 'Turboverdichter'
              },
              ]
            },
            {
              name: 'Verbrennung, Thermo- und Fluiddynamik',
              children: [ {
                name: 'Chemische Thermodynamik'
              },
              {
                name: 'Numerics and Flow Simulation'
              },
              {
                name: 'Praktikum zur Verbrennung und Thermodynamik'
              },
              {
                name: 'Gas Dynamics'
              },
              {
                name: 'Nanopartikel-Entstehungsvorgänge'
              },
              {
                name: 'Quantitative bildgebende Messtechniken in Strömungen'
              },
              {
                name: 'Rheologie 2'
              },
              {
                name: 'Thermische Abfallbehandlung'
              },
              {
                name: 'Thermische Systeme: Analyse, Modellierung und Design'
              },
              {
                name: 'Thermodynamik für Fortgeschrittene'
              },
              {
                name: 'Turbulent Flows'
              },
              ]
            },
            {
              name: 'Verfahrens- und Anlagentechnik',
              children: [ {
                name: 'Adsorption Technology'
              },
              {
                name: 'Laseroptische Messverfahren für reaktive Strömungsprozesse'
              },
              {
                name: 'Objektorientierte Methoden der Modellbildung und Simulation'
              },
              {
                name: 'Planung, Bau und Betrieb von Chemieanlagen'
              },
              {
                name: 'Praktikum zur Verfahrens- und Anlagentechnik'
              },
              ]
            },
          ],
        },
      ],
    },
    {
      name: 'Manager',
      children: [
        {
          name: 'Foreman',
          children: [
            {
              name: 'Worker',
              children: [ {
                name: 'Assistant 1'
              },
              {
                name: 'Assistant 2'
              },
              {
                name: 'Assistant 3'
              }
              ]
            },
          ],
        },
        {
          name: 'Foreman',
          children: [
            {
              name: 'Worker',
              children: [ {
                name: 'Assistant 4'
              },
              {
                name: 'Assistant 5'
              },
              {
                name: 'Assistant 6'
              }
                
              ]
            },
          ],
        },
      ],
    },
  ],
};

export default function TreeChart() {

  
    return (
        <div id="treeWrapper" style={{ width: '100%', height:1000 }}>
        <Tree
        data={orgChart}
        collapsible= {true}
        orientation="horizontal"
        shouldCollapseNeighborNodes= {true}    
        enableLegacyTransitions={true}
        depthFactor= "300"
        initialDepth="1"
        /> 
      </div>
    );
  }
  



