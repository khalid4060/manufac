import{getClassStatistics,calculateGamma} from '../Common/Common'
import {dataset} from '../Utility/Constants'
import { useState,useEffect } from 'react';
const DisplayStats=({property})=>{

   const [classStatistics, setclassStatistics] = useState({});



   useEffect(() => {
    if(property==="Gamma"){
      const datasetWithGamma = dataset.map(dataPoint => {
        const gamma = calculateGamma(dataPoint);
        return { ...dataPoint, Gamma: gamma };
      });
      setclassStatistics(getClassStatistics(datasetWithGamma,"Gamma"))
    }else{
      setclassStatistics(getClassStatistics(dataset,"Flavanoids"))
    }
   }, []);
  
   

      
      return (
        <div className='container'>
         <table className='flavanoids-table'> 
      <thead>
        <tr>
          <th>Measure</th>
          {Object.keys(classStatistics).map(className => (
            <th key={className}>{className}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{property} (Mean)</td>
          {Object.keys(classStatistics).map(className => (
            <td key={className}>{classStatistics[className].mean.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>{property} (Median)</td>
          {Object.keys(classStatistics).map(className => (
            <td key={className}>{classStatistics[className].median.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>{property} (Mode)</td>
          {Object.keys(classStatistics).map(className => (
            <td key={className}>{classStatistics[className].mode.toFixed(3)}</td>
          ))}
        </tr>
      </tbody>
    </table>
        </div>
        
      );
    }
    
export default DisplayStats;



  
  