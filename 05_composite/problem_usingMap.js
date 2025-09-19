// Define role objects
const Employee = { name: "Employee" };
const Manager = { name: "Manager" };
const Administrator = { name: "Administrator" };

/**
 * In JavaScript, there is no built-in "dictionary" type like in Python or c#.
 * Instead, we usually treat objects as dictionary equivalents, but JavaScript also provides the Map type which is closer to a true dictionary.
 *Objects works well for small datasets
 * Keys are always strings (or symbols). Numbers are auto-converted to strings.
 * ⚠️ Prototype chain may cause collisions with built-in object properties (toString, hasOwnProperty, etc.)
 * Map is the official dictionary-like structure in modern JavaScript (introduced in ES6).
 * If you want a true dictionary with any type of keys + better features, use Map.
 *Map has useful built-in methods (get, set, has, delete,clear, size,keys(),values(),entries(),forEach(),Map.prototype[Symbol.iterator] → Same as entries().)
 *Map maintains insertion order of keys.
 *const map = new Map();
 *const map2 = new Map([["a", 1]]);
 *Array →Maintains element order automatically by index.Best for storing ordered lists of values (numbers, strings, objects, etc.).key/undex always a number: arr[0]
 *Map →Maintains insertion order of keys. Best for storing key–value pairs where keys can be any type (not just strings like in objects). key/index can be of any type: map.get(key)
 *Map → Optimized for frequent addition/removal of key–value pairs and when keys aren’t just sequential numbers.
 */
const roles = new Map([
  [
    Employee,
    {
      permissions: ["read_documents"],
      inherits: [],
    },
  ],
  [
    Manager,
    {
      permissions: ["approve_documents"],
      inherits: [Employee],
    },
  ],
  [
    Administrator,
    {
      permissions: ["delete_documents"],
      inherits: [Manager],
    },
  ],
]);

// Function to collect permissions
function getPermissions(roleObj) {
  const allPermissions = new Set();

  function collectPermissions(role) {
    if (roles.has(role)) {
      const roleData = roles.get(role);

      roleData.permissions.forEach((permission) =>
        allPermissions.add(permission)
      );

      roleData.inherits.forEach((inheritedRole) =>
        collectPermissions(inheritedRole)
      );
    }
  }

  collectPermissions(roleObj);
  return Array.from(allPermissions);
}

// Function to display hierarchy
function displayRoleHierarchy(roleObj, indent = "") {
  if (roles.has(roleObj)) {
    const roleData = roles.get(roleObj);

    console.log(`${indent}- Role: ${roleObj.name}`);
    console.log(`${indent}  Permissions: ${roleData.permissions.join(", ")}`);

    roleData.inherits.forEach((inheritedRole) =>
      displayRoleHierarchy(inheritedRole, indent + "  ")
    );
  }
}

// --------------------
// Usage
// --------------------
console.log("Administrator Role Hierarchy:");
displayRoleHierarchy(Administrator);

console.log("\nAdministrator Permissions:", getPermissions(Administrator));
console.log("Manager Permissions:", getPermissions(Manager));
console.log("Employee Permissions:", getPermissions(Employee));
