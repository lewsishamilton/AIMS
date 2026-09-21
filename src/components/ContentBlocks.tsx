import React from "react";
import type { ContentBlock } from "../data/types";

/**
 * Shared renderer for `ContentBlock[]` content.
 * Used by DepartmentFacultyPage and every static page in `data/pages`.
 */

type SectionGroup =
  | { type: "full"; section: ContentBlock }
  | { type: "grid"; sections: ContentBlock[] };

export function groupSections(sections: ContentBlock[]): SectionGroup[] {
  const groups: SectionGroup[] = [];
  let currentHalfGroup: ContentBlock[] = [];

  for (const s of sections) {
    if (s.layout === "half") {
      currentHalfGroup.push(s);
    } else {
      if (currentHalfGroup.length > 0) {
        groups.push({ type: "grid", sections: [...currentHalfGroup] });
        currentHalfGroup = [];
      }
      groups.push({ type: "full", section: s });
    }
  }

  if (currentHalfGroup.length > 0) {
    groups.push({ type: "grid", sections: currentHalfGroup });
  }

  return groups;
}

export const CARD_CLASS =
  "rounded-[26px] border border-[#dce8ee] dark:border-white/10 bg-white dark:bg-white/[0.04] dark:backdrop-blur-xl p-6 sm:p-8 shadow-xs dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]";

export function renderContentBlock(block: ContentBlock, key: string | number) {
  return (
    <div key={key} className={`${CARD_CLASS} flex flex-col justify-between`}>
      <div>
        {block.badges && block.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {block.badges.map((badge, bIdx) => (
              <span
                key={bIdx}
                className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#1f3351] dark:bg-teal-600 text-white"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {block.title && (
          <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-[#1f3351] dark:text-white mb-2">
            {block.title}
          </h3>
        )}

        {block.subtitle && (
          <p className="text-xs sm:text-sm font-medium text-[#62748a] dark:text-slate-400 mb-4">
            {block.subtitle}
          </p>
        )}

        {block.content && (
          <div className="space-y-3 text-sm sm:text-base text-[#62748a] dark:text-slate-300 leading-relaxed mb-4">
            {Array.isArray(block.content) ? (
              block.content.map((p, pIdx) => <p key={pIdx}>{p}</p>)
            ) : (
              <p>{block.content}</p>
            )}
          </div>
        )}

        {block.bullets && block.bullets.length > 0 && (
          <ul className="space-y-3 mt-3">
            {block.bullets.map((bullet, bulletIdx) => (
              <li
                key={bulletIdx}
                className="flex items-start gap-3 text-sm text-[#62748a] dark:text-slate-300 leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-[#1f3351]/10 dark:bg-teal-500/20 text-[#1f3351] dark:text-teal-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const ContentSections: React.FC<{ sections: ContentBlock[] }> = ({
  sections,
}) => (
  <div className="space-y-8">
    {groupSections(sections).map((group, gIdx) => {
      if (group.type === "full") {
        return renderContentBlock(group.section, `full-${gIdx}`);
      }
      return (
        <div
          key={`grid-${gIdx}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {group.sections.map((sec, sIdx) =>
            renderContentBlock(sec, `half-${gIdx}-${sIdx}`)
          )}
        </div>
      );
    })}
  </div>
);
