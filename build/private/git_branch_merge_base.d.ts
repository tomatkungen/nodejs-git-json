import { Oid, Repository } from "nodegit";
export declare const git_branch_merge_base: (repo: Repository, branchCommitOid: Oid, localCommitOid: Oid) => Promise<Oid | null>;
