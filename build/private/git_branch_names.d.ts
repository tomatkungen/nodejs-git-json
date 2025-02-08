import { Repository } from "nodegit";
export declare const git_branch_names: (repository: Repository, excludeBranchName?: string) => Promise<string[]>;
