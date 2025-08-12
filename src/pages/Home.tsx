import React, { useEffect, useState } from 'react';
import { getStudents } from '../api/student.api';

const Home: React.FC = () => {
    // //const [students, setStudents] = useState();
    // useEffect(() => {
    //   const fetchData = async () => {
    //         try {
    //             const res = await getStudents();
    //             console.log("Fetched students:", res);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
  return <h1>Home Page</h1>;
};

export default Home;
