const roles = {
  Employee: {
    permissions: ["read_documents"],
  },
  Manager: {
    permissions: ["approve_documents"],
    inherits: ["Employee"],
  },
  Administrator: {
    permissions: ["delete_documents"],
    inherits: ["Manager"],
  },
};
/**
 *Why Array.from()?
Array.from() is a built-in method that converts array-like or iterable objects into a real JavaScript array.
*A Set is iterable, but not an array.
*If you want to return permissions as a normal array (so you can use map(), filter(), etc.), you must convert it.
 *Array.from() is equivalent to spread operator:
 return [...allPermissions];
 * @param {*} role
 * @return {*} a real javascript array
 */
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

function displayRoleHierarchy(roleName, indent = "") {
  if (roles[roleName]) {
    console.log(`${indent}- Role: ${roleName}`);
    console.log(
      `${indent}  Permissions: ${roles[roleName].permissions.join(", ")}`
    );

    if (roles[roleName].inherits) {
      roles[roleName].inherits.forEach((inheritedRole) =>
        displayRoleHierarchy(inheritedRole, indent + "  ")
      );
    }
  }
}

console.log("Administrator Role Hierarchy:");
displayRoleHierarchy("Administrator");

console.log("\nAdministrator Permissions:", getPermissions("Administrator"));
console.log("Manager Permissions:", getPermissions("Manager"));
console.log("Employee Permissions:", getPermissions("Employee"));
