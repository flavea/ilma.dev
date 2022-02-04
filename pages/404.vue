<template>
  <div>
    <div
      id="not-found"
      class="p-0 w-full lg:relative lg:h-screen flex flex-col justify-center items-center"
    >
      <div class="circles absolute block">
        <div v-for="index in 126" :key="index" class="c" />
      </div>

      <div id="not-found-message" class="p-8 bg-pink mx-4">
        <div
          class="lines absolute left-0 -mt-16 z-10 hidden lg:block"
          style="top: -3rem"
        >
          <div v-for="index in 30" :key="index" class="l" />
        </div>
        <div id="inner-not-found-message">
          <h1
            class="greeting text-pink md:text-yellow relative font-black text-5xl mb-3"
          >
            Not found
            <span class="absolute text-yellow md:text-blue"> Not found </span>
          </h1>
          <p>Oops, the page you are looking for doesn't exist. Sorry!</p>
          <br />
          <nuxt-link to="/" class="button bg-blue shadow-small-yellow block"
            >go to home</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#not-found {
  background: url(https://res.cloudinary.com/ilma/image/upload/v1585552318/assets/illust2_wjiirl_z2rivh.png)
    no-repeat center bottom;
  background-size: 100% auto;

  .circles {
    top: 5%;
  }

  .circles-2 {
    bottom: 0% !important;
    right: 15% !important;
    left: auto;
    top: auto;
    .c {
      @apply border-blue border-solid border-1 inline-block mr-2;
    }
  }

  #not-found-message {
    #inner-not-found-message {
      .greeting {
        line-height: 1;
        z-index: 2;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: var(--yellow);
        span {
          top: 5px;
          left: 5px;
          z-index: 2;
          -webkit-text-stroke-width: 0px;
        }
      }
      .button {
        @apply relative pl-24 pr-24;
        z-index: 2;
      }

      p {
        @apply relative text-white inline p-1;
        z-index: 2;
        line-height: 2rem;
      }
    }
  }
}

@media (min-width: 768px) {
  #not-found {
    background-size: 80% auto;
    #not-found-message {
      width: 60%;
    }
  }
  .greeting {
    -webkit-text-stroke-color: var(--yellow);
  }
}

@media (min-width: 1280px) {
  #not-found {
    background-size: 50% auto;
    background-position: center bottom;
    #not-found-message {
      @apply py-8;
      width: 50%;
      margin-top: -100px;
    }
  }
  .greeting {
    -webkit-text-stroke-color: var(--blue);
  }
  #summary {
    #inner-summ {
      max-width: 1400px;
      grid-template-columns: 0.5fr 1.5fr;

      h1 {
        font-size: 1.6rem;
      }
    }
  }
}
</style>
