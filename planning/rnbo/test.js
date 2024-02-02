function buildTree(ids) {
    var root = { name: 'root', children: [] };
    ids.forEach(function (id) {
        var path = id.split('/');
        var currentNode = root;
        path.forEach(function (nodeName) {
            var existingNode = currentNode === null || currentNode === void 0 ? void 0 : currentNode.children.find(function (child) { return child.name === nodeName; });
            if (existingNode) {
                currentNode = existingNode;
            }
            else {
                var newNode = { name: nodeName, children: [] };
                currentNode.children.push(newNode);
                currentNode = newNode;
            }
        });
    });
    return root;
}
// Example usage
var ids = ["top/A", "top/B", "top/inner/A", "top/inner/B"];
var tree = buildTree(ids);
console.log(JSON.stringify(tree, null, 2));
