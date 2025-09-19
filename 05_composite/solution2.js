/** COMPOSITE PATTERN:
 * Every update (addPermission, addRole) creates and returns a new role object, instead of modifying the old one.
 *This is a functional programming style, often used in React/Redux and state management systems.
 * @param {*} name e.g:"Employee"
 * @returns a plain js object with three keys:
 * OUTPUT: { name: "Employee", permissions: [], subRoles: [] }
 */
function createRole(name) {
  return {
    name,
    permissions: [],
    subRoles: [],
  };
}
/**
 *
 * @param1 {*} role object: createRole("Employee")
 * @param2 {*} permission string:"read_documents"
 * @returns a new role object by copying the old role (...role), Adding the new permission to the permission array using spread.
 * e.g: addPermission(createRole("Employee"), "read_documents");
 *{ name: "Employee", permissions: ["read_documents"], subRoles: [] }

 */
function addPermission(role, permission) {
  return {
    ...role,
    permissions: [...role.permissions, permission],
  };
}
/**
 *
 * @param1 {*object} role
 * @param2 {*object} role(subRole)
 * @returns a new role object with the subRole appended
 * EXAMPLE: const employee = addPermission(createRole("Employee"), "read_documents");
 const manager = addRole(
  addPermission(createRole("Manager"), "approve_documents"),
  employee
);
 */
function addRole(role, subRole) {
  return {
    ...role,
    subRoles: [...role.subRoles, subRole],
  };
}
/**GETTING ALL PERMISSIONS(RECURSIVE)
 * reduce iterates over each element in the subRoles array and accumulates a value
 * The reducer callback signature here is (acc, subRole) => { ... } where:
 acc is the accumulator (here it will be a Set).
 *subRole is the current element (one of the role objects that role inherits from).
 * The second argument to reduce (seen later) initializes acc as new Set(role.permissions), i.e., a Set containing the current role’s own permissions.It is the initial value for acc.
 * const permissions = getPermissions(subRole);Recursive call. For the current subRole, it calls getPermissions to obtain all permissions of that sub-role (including that sub-role’s own subRoles, recursively).
 * calls itself getPermissions(subRole) recursively to collect nested permisssions
 * return new Set([...acc, ...permissions]);
 *Merges the current accumulator acc (which is a Set) with the array permissions.
 *[...] spreads the elements of acc and permissions into a single array, then new Set(...) constructs a Set from that array.
 *Using Set here deduplicates permissions automatically (if multiple subroles have the same permission, it appears once).
 *The returned Set becomes the new acc for the next iteration of reduce.
 * converts the set back to an array
 * Array.from preserves the insertion order of the Set (the order will be: the role’s own permissions first, then permissions discovered from subRoles in the order those subRoles were processed).
 * @param {*object} role
 * @returns array
 */
function getPermissions(role) {
  const allPermissions = role.subRoles.reduce((acc, subRole) => {
    const permissions = getPermissions(subRole);
    return new Set([...acc, ...permissions]);
  }, new Set(role.permissions));
  return Array.from(allPermissions);
}
/**
 * prints the role name and its direct permissions
 * recursively prints each subRole,with indentation increasing at each level.
 * @param {*} role
 * @param {*} indent
 */
function displayRole(role, indent = "") {
  console.log(`${indent} -Role:${role.name}`);
  console.log(`${indent} Permissions:${role.permissions.join(",")}`);
  role.subRoles.forEach((subRole) => displayRole(subRole, indent + " "));
}
const role = createRole("Employee");
role;

const employeeRole = addPermission(role, "Read_Documents");
employeeRole;

// const employeeRole = addRole(employeePermissions);
// employeeRole;

const managerRole = addRole(
  addPermission(createRole("Manager"), "Approve_ Documents"),
  employeeRole
);

const adminRole = addRole(
  addPermission(createRole("Administrator"), "Delete_Documents"),
  managerRole
);
displayRole(adminRole);
console.log("Employee permissions:", getPermissions(employeeRole));
console.log("Manager permissions:", getPermissions(managerRole));
console.log("Admin permissions:", getPermissions(adminRole));

//REDUCE FUNCTION
const words = [
  "apple",
  "banana",
  "apple",
  "orange",
  "banana",
  "dates",
  "orange",
  "apple",
];
const count = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log(count);
