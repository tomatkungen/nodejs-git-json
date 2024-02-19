import { ConvenientPatch } from "nodegit";
import { GitCommitHunks } from "../types/git_types";
export declare const git_commit_hunks: (patch: ConvenientPatch) => Promise<GitCommitHunks>;
