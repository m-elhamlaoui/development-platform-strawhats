import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';

interface CategoryCardProps {
  id: number;
  name: string;
  count: number;
  color: string;
  iconColor: string;
  icon: IconType;

}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, count, color, iconColor, icon: Icon }) => {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/FileType/${name}`}>
    <div
      className={`w-40 h-40 flex flex-col items-center justify-center space-y-2 rounded-md bg-[#111827] hover:shadow-lg transition-shadow cursor-pointer`}
    >
      
        <Icon className={`text-xl text-[#13C2C2]`} />
      
      <p className="text-[#40A9FF] text-lg font-bold">{name}</p>
      <p className="text-[#40A9FF] text-sm">{count} files</p>
    </div>
    </Link>
  );
};

export default CategoryCard;