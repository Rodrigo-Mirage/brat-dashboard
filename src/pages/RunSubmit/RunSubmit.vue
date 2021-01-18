<template>
  <div>
    <h1 class="page-title">Submit your run! &nbsp;
    </h1>
        <b-row>
      <b-col>
        <Widget
          title="<h5>Create <span class='fw-semi-bold'>a run</span></h5>"
          customHeader
        >




        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '../../components/Widget/Widget.vue';
export default {
  components: { Widget },
  name: 'RunSubmit',
};
</script>

