"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.git_trees = void 0;
const git_trees = (branchCommit) => __awaiter(void 0, void 0, void 0, function* () {
    const tree = yield branchCommit.getTree();
    const walk = tree.walk();
    const trees = yield get_trees(walk);
    return trees;
});
exports.git_trees = git_trees;
const get_trees = (walk) => {
    return new Promise((resolve) => {
        walk.on('end', (trees) => {
            resolve(trees);
        });
        walk.on('error', () => {
            resolve([]);
        });
        walk.start();
    });
};
