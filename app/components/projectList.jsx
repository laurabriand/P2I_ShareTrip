import React, { useEffect, useState, View } from 'react';
import { getProjects } from '../lib/projectServices';
import { Project } from './project';

const ProjectList = () => {
    // const [projects, setProjects] = useState([]);
    // useEffect(() => {
    //     const fetchProjects = async () => {
    //         const projectsData = await getProjects();
    //         setProjects(projectsData);
    //     };

    //     fetchProjects();
    // }, []);

    return (
        <View>
            <Project />
            <Project />
            {/* {projects.map((project) => (
                <Project key={project.id} {...project} />
            ))} */}
        </View>
    );

};

export default ProjectList;
