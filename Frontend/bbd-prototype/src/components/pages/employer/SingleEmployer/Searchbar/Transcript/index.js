import React from 'react';

const Transcript = (props) => {
    const { grades } = props;
    
    const transcript = {};
    grades.forEach(gradeData => {
        const { course, universityName, grade} = gradeData;
        if ( !(universityName in transcript) ) {
            transcript[universityName] = {};
        }
        if ( !(course in transcript[universityName]) ) {
            transcript[universityName][course] = grade;
        }
    });

    return (
        <div className='border border-solid p-5 w-100 rounded'>
            <p>Transcript for student with cpr: {grades[0].studentCpr}</p>
            <div>
                {Object.keys(transcript).map((university, i1) => {
                    return (
                        <div className={i1 !== Object.keys(transcript).length - 1 ? "mb-3" : "mb-0"}>
                            <h5 style={{ fontSize: 20, color:"#007bff" }}>{university}</h5>
                            <div>
                                {Object.keys(transcript[university]).map(course => {
                                    return (
                                        <p className='mb-0'>{course}: {transcript[university][course]}</p>
                                    )
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Transcript;