<script lang="ts">
    export let header: string;
    export let message: string;
    export let type: 'success' | 'info' | 'warning' | 'error';
    const fontColor = (type: string): string => {
      switch (type) {
        case 'error':
          return '#dc2626';
        case 'warning':
          return '#f97316';
        case 'success':
          return '#059669';
        default:
          return '#0284c7';
      }
    };
    const color = fontColor(type);
    console.log('TYPE:', type);
    console.log('COLOR:', color);
  </script>
  
  <div class="alert alert-{type}">
    <div class="w-max">
      {#if type == 'success'}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill={fontColor(type)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C6.47967 21.9939 2.00606 17.5203 2 12V11.8C2.10993 6.30453 6.63459 1.92796 12.1307 2.00088C17.6268 2.07381 22.0337 6.56889 21.9978 12.0653C21.9619 17.5618 17.4966 21.9989 12 22ZM7.41 11.59L6 13L10 17L18 9L16.59 7.58L10 14.17L7.41 11.59Z"
            fill={fontColor(type)}
          />
        </svg>
      {:else if type == 'warning'}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill={fontColor(type)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.2659 20.998H2.73288C2.37562 20.998 2.04551 20.8074 1.86688 20.498C1.68825 20.1886 1.68825 19.8074 1.86688 19.498L11.1329 3.49799C11.3117 3.1891 11.6415 2.9989 11.9984 2.9989C12.3553 2.9989 12.6851 3.1891 12.8639 3.49799L22.1299 19.498C22.3084 19.8072 22.3085 20.1882 22.1301 20.4975C21.9518 20.8069 21.622 20.9976 21.2649 20.998H21.2659ZM10.9999 15.998V17.998H11.9329H11.9979H12.0629H12.9979V15.998H10.9999ZM10.9999 8.99799V13.998H12.9999V8.99799H10.9999Z"
            fill={fontColor(type)}
          />
        </svg>
      {:else if type == 'error'}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill={fontColor(type)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.2659 20.998H2.73288C2.37562 20.998 2.04551 20.8074 1.86688 20.498C1.68825 20.1886 1.68825 19.8074 1.86688 19.498L11.1329 3.49799C11.3117 3.1891 11.6415 2.9989 11.9984 2.9989C12.3553 2.9989 12.6851 3.1891 12.8639 3.49799L22.1299 19.498C22.3084 19.8072 22.3085 20.1882 22.1301 20.4975C21.9518 20.8069 21.622 20.9976 21.2649 20.998H21.2659ZM10.9999 15.998V17.998H11.9329H11.9979H12.0629H12.9979V15.998H10.9999ZM10.9999 8.99799V13.998H12.9999V8.99799H10.9999Z"
            fill={fontColor(type)}
          />
        </svg>
      {:else}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill={fontColor(type)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"
            fill={fontColor(type)}
          />
        </svg>
      {/if}
    </div>
    <div class="mx-4" style="color: {color}">
      <span class="text-lg font-bold inline-block">{header}:</span>
      <span id="message" class="mx-2 text-base font-semibold inline-block">{message}</span>
    </div>
  </div>
  
  <style>
    #message {
      margin-top: 2px;
    }
  </style>