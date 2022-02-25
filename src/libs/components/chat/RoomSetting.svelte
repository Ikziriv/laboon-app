<script>
	import { goto } from '$app/navigation';
    import { getAuth, signOut } from 'firebase/auth';
    import { getFirestore, doc, setDoc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
    import { userDetails } from '../../stores/user';
    import { createEventDispatcher } from 'svelte';
    // Initialize the auth and firestore getter function
    const auth = getAuth();
    const db = getFirestore();
    // Settings state variables
    let roomCode;
    let isInRoom = false;
    let isRoomAdmin = false;
    let id = null;
    // Create event dispatcher to dispatch data to the parent home page 
    // to check whether user is in room or not
    const dispatch = createEventDispatcher();
    // function to handle sign out
    function handleSignOut() {
        signOut(auth).then(() => {
            // Delete user details from the user store
            console.log('Sign out');
            $userDetails = {
                roomId: '',
                uid: '',
                displayName: '',
                photoURL: '',
                message: ''
            };
            // Reset state variables
            roomCode = '';
            isInRoom = false;
            isRoomAdmin = false;
            id = null;
            // Inform parent home page that user is not in room
            dispatch('user-in-room', {
                isInRoom: false
            });
            // Redirect to index page
            goto('/');
        }).catch(err => console.log(err));
    }
    // Function to create a new room
    function createRoom() {
        id = generateRoomId()
        // Create room with newly created id
        setDoc(doc(db, 'chatrooms', id), {
            uid: id,
            adminId: $userDetails.uid,
            createdAt: serverTimestamp(),
            messages: []
        })
        .then(() => {
            console.log('Room created with id: ', id);
            isInRoom = true;
            isRoomAdmin = true;
            // Add room id to user store
            $userDetails = {...$userDetails, roomId: id};
            // Inform parent home page that user is in room
            dispatch('user-in-room', {
                isInRoom: true
            });
        })
        .catch(err => console.log(err));
    }
    // Function to join a room
    function joinRoom() {
        // Get room details
        getDoc(doc(db, 'chatrooms', roomCode))
        .then(data => {
            // True if room exists
            if (data.exists()) {
                console.log('Room entered with id: ', roomCode);
                id = roomCode;
                roomCode = '';
                isInRoom = true;
                // Add room id to user store
                $userDetails = {...$userDetails, roomId: id};
                
                // Set user as admin if user had created the room
                if (data.data().adminId === $userDetails.uid)
                    isRoomAdmin = true;
            
                // Inform parent home page that user is in room
                dispatch('user-in-room', {
                    isInRoom: true
                });
            }
            else {
                console.log('Room not found with id: ', roomCode);
            }
        })
        .catch(err => console.log(err));
    }
    // Function to leave a room
    function leaveRoom() {
        console.log('Room left with id: ', id);
        isInRoom = false;
        id = null;
        // Remove room id to user store
        delete $userDetails['roomId'];
        // Inform parent home page that user is not in room
        dispatch('user-in-room', {
            isInRoom: false
        });
    }
    
    // Function to end a room
    function endRoom() {
        // Delete room document
        deleteDoc(doc(db, 'chatrooms', id))
        .then(() => {
            console.log('Room deleted with id: ', id);
            isInRoom = false;
            isRoomAdmin = false;
            id = null;
            roomCode = '';
            // Remove room id to user store
            delete $userDetails['roomId'];
            // Inform parent home page that user is not in room
            dispatch('user-in-room', {
                isInRoom: false
            });
        });
    }
    // Function to generate room id
    function generateRoomId() {
        let roomId = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
        for (let i = 0; i < 6; i++) 
            roomId += chars.charAt(Math.floor(Math.random() * chars.length));
   
        return roomId;
    }
</script>


<div class="w-full border-2 border-gray-200 shadow-md rounded-md p-4 h-64 dark:bg-gray-900 dark:border-purple-600 overflow-auto">
    <div class="flex flex-row justify-between items-center mb-4">
        <h3 class="text-xl font-semibold dark:text-white">
            Settings
        </h3>
        <span 
            class="text-xs font-medium text-gray-900 hover:text-purple-800 dark:text-gray-50 dark:hover:text-purple-800 cursor-pointer"
            on:click={handleSignOut}
        >    
            Log out
        </span>
    </div>
    <!-- Create room section -->
    {#if !isInRoom}
    <button 
        class="block text-sm bg-purple-600 text-white w-full border-2 border-purple-600 rounded-md px-4 py-1 duration-200
        hover:bg-white hover:text-black
        dark:bg-purple-800 dark:border-purple-800 dark:hover:bg-gray-900 dark:hover:text-white"
        on:click={createRoom}
    >
        Create a room
    </button>
    <p class="text-center font-semibold dark:text-gray-50 my-4">
        OR
    </p>
    <form on:submit|preventDefault={joinRoom}>
        <input 
            type="text" 
            class="block bg-gray-200 text-sm w-full p-1 border-2 border-gray-200 rounded-md outline-none 
            focus:border-purple-600 
            dark:bg-gray-700 dark:text-gray-50 dark:border-gray-700 dark:focus:border-purple-600"
            placeholder="Enter room code"
            bind:value={roomCode}
            required
        >    
    </form>
    <!-- Room settings section -->
    {:else}
    <p class="text-black dark:text-white mb-4">
        Room code : 
        <span 
            class="text-sm text-gray-900 pl-2 dark:text-gray-50 cursor-pointer"
            title="Copy to clipboard"
            on:click={() => navigator.clipboard.writeText(id)}
        >
            {id}
        </span>
    </p>
    <button 
        class="block text-sm bg-white text-black w-full border-2 border-purple-600 rounded-md px-4 py-1 mb-4 duration-200
        hover:bg-purple-600 hover:text-white
        dark:bg-gray-900 dark:text-white dark:hover:bg-purple-600"
        on:click={leaveRoom}    
    >
        Leave room 
    </button>
    {#if isRoomAdmin}
    <button 
        class="block text-sm bg-purple-600 text-white w-full border-2 border-purple-600 rounded-md px-4 py-1 duration-200
        hover:bg-white hover:text-black
        dark:bg-purple-600 dark:text-white dark:hover:bg-gray-900"
        on:click={endRoom}
    >
        End room 
    </button>
    {/if}
    {/if}
</div>