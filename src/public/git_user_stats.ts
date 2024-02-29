import { Config, CONFIG } from "../types/config.types";
import { GitUserStats } from "../types/git_types";
import { git_log } from "./git_log";

export const git_user_stats = async (path: string = './', config: Config = CONFIG): Promise<GitUserStats> => {
    const gitLog = await git_log(path, config);

    return [];
}

// const filterDate = (commit: Commit, gitLogFilter: GitLogFilter): boolean => {
//     const filterDate = ('filterDate' in gitLogFilter) && gitLogFilter.filterDate;

//     if (!filterDate)
//         return true;

//     if (
//         filterDate.startDate && isValidDate(filterDate.startDate) &&
//         filterDate.endDate && isValidDate(filterDate.endDate)
//     ) {
//         const st = new Date(`${filterDate.startDate}T00:00:00`).getTime();
//         const en = new Date(`${filterDate.endDate}T00:00:00`).getTime();

//         const YYYY = commit.date().getFullYear(), MM = commit.date().getMonth() + 1, DD = commit.date().getDate()
//         const cu = new Date(`${YYYY}-${MM.toString().padStart(2, '0')}-${DD.toString().padStart(2, '0')}T00:00:00`).getTime();

//         return (
//             (st <= cu && cu <= en) ||
//             (en <= cu && cu <= st)
//         )
//     }

//     return true;
// }

// const isValidDate = (date?: DateFormat): boolean => (
//     !!(date && !isNaN(new Date(date).getTime()))
// );