import "./App.css";
import contactsJSON from "./contacts.json";
import { useState } from "react";

function App() {
  //display contacts
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5));
  console.log("contacts", contacts);
  // remaining contacts that are not yet displayed
  const [remainingContacts, setRemainingContacts] = useState(
    contactsJSON.slice(5)
  );

  // function for adding random contact
  const addRandomContact = () => {
    //check if there are remaining contacts
    if (remainingContacts.length > 0) {
      //get random index of remaining contacts array
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      //
      const randomContact = remainingContacts[randomIndex];
      // remove the selected random contact from remaing contact
      setRemainingContacts((prevRemainingContacts) =>
        prevRemainingContacts.filter(
          (contact) => contact.id !== randomContact.id
        )
      );
      setContacts((prevContacts) => [...prevContacts, randomContact]); //copy
    }
  };

  // Function to sort contacts by name (alphabetically)
  const sortByName = () => {
    const sortedContacts = [...contacts].sort((a, b) => {
      //  string comparison
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setContacts(sortedContacts);
  };

  // Function to sort contacts by popularity (highest first with minus)
  const sortByPopularity = () => {
    const sortedContacts = [...contacts].sort((a, b) => {
      // numerical comparison
      return b.popularity - a.popularity;
    });
    setContacts(sortedContacts);
  };

  // Function to delete contact
  const deleteContact = (id) => {
    // Filter out the contact with the given id from Contacts displayed
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  return (
    <div className="App">
      <h1>React IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by name </button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((oneContact) => {
            return (
              <tr key={oneContact.id}>
                <td>
                  <img
                    className="image"
                    src={oneContact.pictureUrl}
                    alt={oneContact.name}
                  />
                </td>
                <td>
                  <h3>{oneContact.name}</h3>
                </td>

                <td>
                  <h3>{oneContact.popularity}</h3>
                </td>
                <td>{oneContact.wonOscar ? "🏆" : null}</td>
                <td>{oneContact.wonEmmy ? "🔥" : null}</td>
                <td>
                  <button onClick={() => deleteContact(oneContact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default App;
