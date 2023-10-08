<template>
  <!-- v-if="canViewVerticalNavMenuLink(item)" -->

  <li
    class="nav-item"
    :class="{
      active: isActive,
      disabled: item.disabled,
    }"
  >
    <!-- <feather-icon :icon="item.icon || 'CircleIcon'" /> -->
    <b-link class="d-flex align-items-center" :to="linkProps.to" tag="a">
      <feather-icon :icon="item.icon || 'CircleIcon'" />
      <span class="menu-title text-truncate">{{
        item.title | capitalize
      }}</span>
      <b-badge
        v-if="item.tag"
        pill
        :variant="item.tagVariant || 'primary'"
        class="mr-1 ml-auto"
      >
        {{ item.tag }}
      </b-badge>
    </b-link>
  </li>
</template>

<script>
import { useUtils as useAclUtils } from "@core/libs/acl";
import { BLink, BBadge } from "bootstrap-vue";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import useVerticalNavMenuLink from "./useVerticalNavMenuLink";
import mixinVerticalNavMenuLink from "./mixinVerticalNavMenuLink";

export default {
  components: {
    BLink,
    BBadge,
  },
  mixins: [mixinVerticalNavMenuLink],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { isActive, linkProps, updateIsActive } = useVerticalNavMenuLink(
      props.item
    );
    const { t } = useI18nUtils();
    const { canViewVerticalNavMenuLink } = useAclUtils();

    return {
      isActive,
      linkProps,
      updateIsActive,

      // ACL
      canViewVerticalNavMenuLink,

      // i18n
      t,
    };
  },
};
</script>
