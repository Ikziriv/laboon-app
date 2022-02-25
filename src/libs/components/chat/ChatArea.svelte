<script lang="ts">
    import { getAuth } from 'firebase/auth';
    import { getFirestore, onSnapshot, doc, updateDoc } from 'firebase/firestore';
    import { userDetails } from '../../stores/user';
    // Initialize the auth and firestore getter function
    const auth = getAuth();
    const db = getFirestore();
    export let isInRoom = false;
    let unsubscribe;
    let message = '';
    let chats = [];
    let inputTag;
    // function to post messages to the server
    function handleMessages() {
        const tempMessage = message;
        message = '';
        inputTag.focus();
        
        updateDoc(doc(db, 'chatrooms', $userDetails.roomId), {
            messages: [...chats, {
                uid: $userDetails.uid,
                displayName: $userDetails.displayName,
                photoURL: $userDetails.photoURL,
                message: tempMessage
            }]
        })
        .then(() => {
            console.log('Message added successfully');
            document.getElementById('latest-message').scrollIntoView();
        })
        .catch(err => console.log(err));
    }
    // Run this code if user is in a room to create a snapshot
    $: if (isInRoom) {
        unsubscribe = onSnapshot(doc(db, 'chatrooms', $userDetails.roomId), docs => chats = docs.data().messages) ;
        console.log('Created snapshot');
    } else {
        // Run this callback function when user leaves a room to unsubscribe from snapshot
        if (unsubscribe) {
            unsubscribe();
            // Remove all previous chats
            chats = [];
            console.log('Unsubscribed from snapshot');
        }
    }
</script>

<div class="chat-area w-full bg-gray-100 shadow-inner dark:bg-gray-800 md:rounded-md">
    {#if isInRoom}
    <div class="w-full h-full flex flex-col justify-between">
        <div class="h-full p-2 overflow-auto">
            <!-- Chat messages will be displayed here -->
            {#if chats}
            {#each chats as {displayName, message, uid, photoURL}, i}
                <!-- Chat message -->
                <div class="flex flex-row justify-start items-center">
                    {#if uid !== $userDetails.uid}
                    <img 
                        class="block mb-4 mr-2 h-8 rounded-full"
                        src={photoURL} 
                        alt={displayName}
                    >
                    {/if}
                    <p 
                        class="px-2 py-1 mb-4 rounded-md w-4/5 md:9/12 text-white 
                        {uid === $userDetails.uid ? 'bg-purple-600 ml-auto rounded-tr-none' : `bg-gray-300 dark:bg-gray-600 
                        rounded-tl-none text-gray-800 dark:text-white`
                        }"
                        id={chats.length === i + 1 ? 'latest-message' : ''}
                    >
                        <span class="block text-xs font-medium {uid === $userDetails.uid ? '' : 'mb-2'}">
                            {uid === $userDetails.uid ? '' : displayName}
                        </span>
                        {message}
                    </p>
                </div>
            {/each}
            {/if}
        </div>
        <!-- Input tag to send messages -->
        <form 
            class="flex flex-row justify-between items-center h-12 md:h-14 md:p-2"
            on:submit|preventDefault={handleMessages}
        >
            <input 
                type="text"
                class="w-full h-full bg-gray-200 md:rounded-md p-1 outline-none md:border-2 md:border-gray-200 md:focus:border-purple-600
                dark:bg-gray-700 dark:text-gray-50 dark:md:border-gray-700 dark:md:focus:border-purple-600"
                placeholder="Enter message"
                bind:value={message}
                bind:this={inputTag}
                required
            >
            <button class="h-full px-2 py-1 font-semibold text-white bg-purple-600 outline-none md:rounded-md 
            md:ml-2 hover:bg-purple-800 duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </button>
        </form>
    </div>
    {:else}
    <div class="w-full h-full px-2 flex flex-col justify-center items-center">
        <h4 class="text-md text-gray-900 dark:text-gray-50">
            Oops. It seems that you are not a part of any conversation right now. 
            Create a room or join one to get started.
        </h4>
    </div>
    {/if}
</div>

<style>
    /* Add scroll behavior for chat area */
    :global(*) {
        scroll-behavior: smooth;
    }
    /* Chat area */
    .chat-area {
        height: 90vh;
    }
    
    /* Scrollbar styling */
    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
        background-color: rgb(55 65 81);
    }
    
    /* Thumb */
    ::-webkit-scrollbar-thumb {
        background-color: rgb(147 51 234);
    }
    
    /* Hover effect on thumb */
    ::-webkit-scrollbar-thumb:hover {
        background-color: rgb(107 33 168);
    }
    
    @media all and (min-width: 768px) {
        .chat-area {
            height: 85vh;
        }
    }
</style>