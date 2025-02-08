import { Merge, Oid, Repository } from "nodegit";

export const git_branch_merge_base = async (repo: Repository, branchCommitOid: Oid, localCommitOid: Oid): Promise<Oid | null> => {
    try {
        return await Merge.base(repo, branchCommitOid, localCommitOid);
    } catch (error) {
        return null;
    }
}