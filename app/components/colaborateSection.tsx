import React, {useEffect, useState} from 'react';
import CollaborateCard from './colaborateCard';
import { fetchDepartement } from '../utils/fetchDepartement';
import { getCurrentUserClient } from '../utils/auth-client';

const departments = [
  { id: 1, name: "Dev Department", color: "bg-indigo-500", image: "/images/portrait.png" },
  { id: 2, name: "Marketing Department", color: "bg-teal-500", image: "/images/portrait2.png" },
  { id: 3, name: "djjs Department", color: "bg-pink-500", image: "/images/portrait3.png" },
  { id: 4, name: "slwlj Department", color: "bg-indigo-500", image: "/images/portrait4.png" },
];

interface User {
  userId: number;
  email: string;
  role: string;
  departement: string;
}

const CollaborateSection: React.FC = () => {

    const [users, setUsers] = useState<{ 
      departmentName: string; 
      userName: string; 
      imgurl: string;
      createdAt: string;
      }[]>([]);
      const [user, setUser] = useState<User | null>(null);
      const colors = ["bg-indigo-500", "bg-teal-500", "bg-pink-500"]
    useEffect(() => {
      const getDepartement = async () => {
        const user = await getCurrentUserClient();
        setUser(user);
        const result = await fetchDepartement();
        setUsers(result.departments);
        console.log(result.departments);
      };
  
      getDepartement();
    }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Collaborate</h2>
      <div className="flex space-x-4">
        {users.map((department, index) => (
          department.departmentName !== user?.departement &&
          (<CollaborateCard key={index} name={department.departmentName} color={colors[Math.floor(Math.random() * colors.length)]} image={department.imgurl} id={index} />)
        ))}
      </div>
    </div>
  );
};

export default CollaborateSection;