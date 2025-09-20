// You have an existing class that fetches data from a REST API in a specific format. However, you need to integrate it with a new component that expects the data in a different format. Implement a system to adapt the existing class to work with the new component.
// 🎯 Existing class (cannot be changed)
/**
 * This is a textbook Adapter Pattern: we have an existing class (fetches REST API data in one format), but a new component expects a different format. Instead of rewriting everything, we build an adapter that translates between them.
 */
class OldApiService {
  fetchData() {
    // Simulated REST API response
    return {
      user_id: 101,
      user_name: "Alice",
      user_email: "alice@example.com",
    };
  }
}

// 🆕 New component expects data in a different format
class NewComponent {
  render(user) {
    console.log(`User Profile: ${user.id} | ${user.name} | ${user.email}`);
  }
}

// 🔌 Adapter: converts old API format -> new format
class ApiAdapter {
  constructor(oldApiService) {
    this.oldApiService = oldApiService;
  }

  getFormattedData() {
    const oldData = this.oldApiService.fetchData();
    // Convert format
    return {
      id: oldData.user_id,
      name: oldData.user_name,
      email: oldData.user_email,
    };
  }
}

// --- 🎮 Client Code ---
const oldApiService = new OldApiService();
const adapter = new ApiAdapter(oldApiService);
const newComponent = new NewComponent();

const adaptedData = adapter.getFormattedData();
newComponent.render(adaptedData);
