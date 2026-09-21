import React from "react";
import { Link } from "react-router-dom";
import type { Department } from "../../data/facultyData";

interface DepartmentCardProps {
  department: Department;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  return (
    <Link
      to={`/departments/${department.id}`}
      className="relative overflow-hidden rounded-[26px] border border-[#dce8ee] dark:border-white/15 group cursor-pointer block h-[260px] sm:h-[280px] shadow-sm dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
    >
      {/* Background Image */}
      <img
        src={department.bgImage}
        alt={department.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Navy Overlay matching Home/DepartmentsSection */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2346]/95 via-[#1f3351]/70 to-transparent" />

      {/* Top Badge: Category & Count */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/40 text-white/90 backdrop-blur-md border border-white/20">
          {department.category} • {department.facultyCount} {department.facultyCount === 1 ? "Faculty" : "Faculty"}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-5 inset-x-0 px-6 z-10">
        <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-white">
          {department.name}
        </h3>
        <p className="mt-1 text-xs text-white/80 line-clamp-1">
          {department.description}
        </p>
      </div>
    </Link>
  );
};

export default DepartmentCard;
