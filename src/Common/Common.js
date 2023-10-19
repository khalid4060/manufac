// Function to calculate the mean
function calculateMean(data, property) {
    const total = data.reduce((sum, item) => sum + item[property], 0);
    return total / data.length;
  }

// Function to calculate the median
function calculateMedian(data, property) {
    const sortedData = data.slice().sort((a, b) => a[property] - b[property]);
    const middle = Math.floor(data.length / 2);
    
    if (data.length % 2 === 0) {
      return (sortedData[middle - 1][property] + sortedData[middle][property]) / 2;
    } else {
      return sortedData[middle][property];
    }
  }

// Function to calculate the mode 
function calculateMode(data, property) {
    const countMap = {};
    let mode = null;
    let maxCount = 0;
  
    for (const item of data) {
      const value = item[property];
      countMap[value] = (countMap[value] || 0) + 1;
      
      if (countMap[value] > maxCount) {
        mode = value;
        maxCount = countMap[value];
      }
    }
  
    return mode;
  }

  // Organize data by classes, eg-{1:[all class 1 alcohol],2:[all class 2 alcohol]}
function organizeDataByClasses(data) {
    const classes = {};
    data.forEach(item => {
      const className = item.Alcohol;
      if (!classes[className]) {
        classes[className] = [];
      }
      classes[className].push(item);
    });
    return classes;
  }

 // Calculate class-wise statistics
 export  function getClassStatistics(data,property) {
    const organizedData = organizeDataByClasses(data);
    const classStatistics = {};
  
    for (const className in organizedData) {
      const classData = organizedData[className];
     // console.log(classData)
      classStatistics[className] = {
        mean: calculateMean(classData,property),
        median: calculateMedian(classData,property),
        mode: calculateMode(classData,property),
      };
    }
  
    return classStatistics;
  }
  // Function to calculate Gamma for a data point
  export function calculateGamma(dataPoint) {
    const { Ash, Hue, Magnesium } = dataPoint;
    return (Ash * Hue) / Magnesium;
  }