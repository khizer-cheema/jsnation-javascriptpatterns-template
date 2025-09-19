/**
 * So in the code, this is ES6 object literal.
 * The shorthand form just removes : function.
clone() { ... } is just shorthand for clone: function() { ... }.

toString() { ... } is shorthand for toString: function() { ... }.

That’s why you don’t see key:value pair — it’s implied.
 */
const documentTemplatePrototype = {
  clone() {
    return Object.create(this);
  },
  toString() {
    return `Document Title: ${this.title},\n content:${this.content}`;
  },
};
/**
 * function to create a new document template
 * @param {*} title
 * @param {*} content
 * @returns newTemplate object
 */
function createDocumentTemplate(title, content) {
  const newTemplate = Object.create(documentTemplatePrototype);
  newTemplate.title = title;
  newTemplate.content = content;

  return newTemplate;
}

const masterDocument = createDocumentTemplate(
  "please write your title here...",
  "give content info here"
);

// Clone the report template for another department
const financeReport = masterDocument.clone();
masterDocument.title = "Finance Report";
masterDocument.content = "This is a finance-specific report.";

// Clone again for HR
const hrReport = masterDocument.clone();
hrReport.title = "HR Report";
hrReport.content = "This is an HR-specific report.";

console.log(financeReport.toString());
console.log(hrReport.toString());

/*✅ REAL LIFE SCENARIOS: Real-life connection:

Companies reuse document structures (e.g., invoice, report, receipt etc).

Instead of rewriting logic each time, they clone a prototype and fill in dynamic data.

This is the Prototype Pattern in action.
*/
