import { Commit, Tree } from "nodegit";

export const git_trees = async (branchCommit: Commit): Promise<Tree[]> => {
    const tree = await branchCommit.getTree();

    const walk = tree.walk();

    const trees = await get_trees(walk);

    return trees;
}

const get_trees = (walk : NodeJS.EventEmitter & { start: () => void; }): Promise<Tree[]> => {
    return new Promise((resolve) => {
        walk.on('end', (trees: Tree[]) => {
            resolve(trees);
        });

        walk.on('error', () => {
            resolve([]);
        })

        walk.start();
    });
}