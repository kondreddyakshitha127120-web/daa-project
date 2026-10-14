// Graph used for the visualization
const graph = {
    A: ["B", "C"],
    B: ["A", "D", "E"],
    C: ["A", "F"],
    D: ["B"],
    E: ["B"],
    F: ["C"]
};

// Positions of nodes on the screen
const positions = {
    A: { top: "30px", left: "45%" },
    B: { top: "110px", left: "25%" },
    C: { top: "110px", left: "65%" },
    D: { top: "190px", left: "10%" },
    E: { top: "190px", left: "40%" },
    F: { top: "190px", left: "75%" }
};

// Display the graph with edges
function displayGraph() {

    const graphArea = document.getElementById("graph");

    graphArea.innerHTML = "";

    // Create nodes
    for (let node in positions) {

        const nodeElement = document.createElement("div");

        nodeElement.className = "node";
        nodeElement.textContent = node;

        nodeElement.style.top = positions[node].top;
        nodeElement.style.left = positions[node].left;

        nodeElement.id = "node-" + node;
       nodeElement.onclick = function () {

    document.querySelectorAll(".node").forEach(function (n) {
        n.classList.remove("selected");
    });

    nodeElement.classList.add("selected");

    document.getElementById("startNode").value = node;
};

        graphArea.appendChild(nodeElement);
    }

    // Create edges
    const edges = [
        ["A", "B"],
        ["A", "C"],
        ["B", "D"],
        ["B", "E"],
        ["C", "F"]
    ];

    edges.forEach(([from, to]) => {

        const edge = document.createElement("div");

        edge.className = "edge";

        const fromNode = document.getElementById("node-" + from);
        const toNode = document.getElementById("node-" + to);

        const x1 = fromNode.offsetLeft + 25;
        const y1 = fromNode.offsetTop + 25;

        const x2 = toNode.offsetLeft + 25;
        const y2 = toNode.offsetTop + 25;

        const length = Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2)
        );

        const angle =
            Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        edge.style.width = length + "px";
        edge.style.left = x1 + "px";
        edge.style.top = y1 + "px";
        edge.style.transform = `rotate(${angle}deg)`;

        graphArea.appendChild(edge);
    });
}

// Run Breadth First Search
function runBFS() {

    resetGraph();

    let start = document
        .getElementById("startNode")
        .value
        .toUpperCase();
document.getElementById("algorithmStatus").textContent =
    "Current Algorithm: BFS";

document.getElementById("startStatus").textContent =
    "Starting Node: " + start;
    if (!graph[start]) {
        alert("Please enter a valid starting node: A, B, C, D, E or F");
        return;
    }

    let queue = [start];
    let visited = new Set();
    let traversal = [];

    while (queue.length > 0) {

        let current = queue.shift();

        if (!visited.has(current)) {

            visited.add(current);
            traversal.push(current);

            for (let neighbor of graph[current]) {

                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }

    function showTraversal(traversal) {

    document.getElementById("result").textContent =
        "Traversal Order: " + traversal.join(" → ");

    document.querySelector(".statistics p").textContent =
        "Nodes Visited: " + traversal.length;

    traversal.forEach((node, index) => {

        setTimeout(() => {

            // Remove current highlight from all nodes
            document.querySelectorAll(".node").forEach(function(n) {
                n.classList.remove("current");
            });

            const nodeElement =
                document.getElementById("node-" + node);

            // Highlight current node
            nodeElement.classList.add("current");

            // Mark it as visited
            nodeElement.classList.add("visited");

        }, index * 500);
    });
}

// Run Depth First Search
function runDFS() {

    resetGraph();

    let start = document
        .getElementById("startNode")
        .value
        .toUpperCase();
        document.getElementById("algorithmStatus").textContent =
    "Current Algorithm: DFS";

document.getElementById("startStatus").textContent =
    "Starting Node: " + start;

    if (!graph[start]) {
        alert("Please enter a valid starting node: A, B, C, D, E or F");
        return;
    }

    let visited = new Set();
    let traversal = [];

    function dfs(node) {

        visited.add(node);
        traversal.push(node);

        for (let neighbor of graph[node]) {

            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }

    dfs(start);

    showTraversal(traversal);
    document.getElementById("structureTitle").textContent = "DFS Stack";
document.getElementById("structureContent").textContent =
    traversal.join(" → ");
}

// Display traversal result
function showTraversal(traversal) {

    document.getElementById("result").textContent =
        "Traversal Order: " + traversal.join(" → ");

    document.querySelector(".statistics p").textContent = "Nodes Visited: " + traversal.length
    traversal.forEach((node, index) => {

        setTimeout(() => {

            const nodeElement =
                document.getElementById("node-" + node);

            nodeElement.classList.add("visited");

        }, index * 500);
    });
}

// Reset graph
function resetGraph() {

    document.getElementById("result").textContent =
        "Select BFS or DFS to start traversal.";

    displayGraph();
}

// Display graph when page loads
displayGraph();