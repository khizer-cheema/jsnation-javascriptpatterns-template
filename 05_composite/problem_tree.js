/**Some related box-drawing symbols you can use for trees:

│ (U+2502) vertical bar

├ (U+251C) branch

└ (U+2514) corner/end branch

─ (U+2500) horizontal line

So, you can build nice tree hierarchies with them.
 * These are Unicode characters we’ll use to mimic a tree:
 *└─ → used for the last child of a branch.
 *├─ → used for middle children.
 *│ → means "there’s still another branch going down."
 * " " (3 spaces) → empty space when no further branch.
 *So the trick is:
 Every time we go deeper in recursion, we add either │ or " " to the prefix.
 * When recursing:
 *If this role is last child, then future lines should use " " (spaces).
 *If this role is not last child, then future lines should use "│ " (keep the vertical line alive).
 * 
 * 
 * 
 */

const roles = {
  Employee: {
    permissions: ["read_documents"],
  },
  Manager: {
    permissions: ["approve_documents"],
    inherits: ["Employee"],
  },
  Auditor: {
    permissions: ["view_audit_logs"],
    inherits: ["Employee"],
  },
  Administrator: {
    permissions: ["delete_documents"],
    inherits: ["Manager", "Auditor"],
  },
};
function getPermissions(role) {
  let allPermissions = new Set();

  function collectPermissions(roleName) {
    if (roles[roleName]) {
      roles[roleName].permissions.forEach((permission) =>
        allPermissions.add(permission)
      );

      if (roles[roleName].inherits) {
        roles[roleName].inherits.forEach((inheritedRole) =>
          collectPermissions(inheritedRole)
        );
      }
    }
  }

  collectPermissions(role);
  return Array.from(allPermissions);
}
function displayRoleHierarchy(roleName, prefix = "", isLast = true) {
  if (!roles[roleName]) return;

  const connector = isLast ? "└─" : "├─";

  console.log(`${prefix}${connector} Role: ${roleName}`);
  console.log(
    `${prefix}   Permissions: ${roles[roleName].permissions.join(", ")}`
  );
  const inherits = roles[roleName].inherits || [];

  inherits.forEach((inheritedRole, index) => {
    const isLastChild = index === inherits.length - 1;
    const newPrefix = prefix + (isLast ? "   " : "│  ");
    displayRoleHierarchy(inheritedRole, newPrefix, isLastChild);
  });
}

displayRoleHierarchy("Administrator");

function displayRoleHierarchyWithPermissions(
  roleName,
  prefix = "",
  isLast = true
) {
  if (roles[roleName]) {
    // ├─ or └─ depending on position
    const connector = isLast ? "└─" : "├─";

    // Print role
    console.log(`${prefix}${connector} Role: ${roleName}`);

    // Print permissions
    console.log(
      `${prefix}   Permissions: ${roles[roleName].permissions.join(", ")}`
    );

    // Handle inherited roles
    const inherits = roles[roleName].inherits || [];
    inherits.forEach((inheritedRole, index) => {
      const isChildLast = index === inherits.length - 1;
      // Keep vertical line │ if not last
      const newPrefix = prefix + (isLast ? "   " : "│  ");
      displayRoleHierarchy(inheritedRole, newPrefix, isChildLast);
    });
  }
}

// Run
console.log("Administrator Role Hierarchy:");
displayRoleHierarchyWithPermissions("Administrator");
