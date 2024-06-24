import {
  type TCms_PageMetaContents_QueryOptionalFields,
} from "../../Generated/Services/Cms/Types/TCms_PageMetaContents_QueryOptionalFields";

const cmsPageMetaContentsQueryOptionalFieldsFactory = (withProperty: boolean): TCms_PageMetaContents_QueryOptionalFields => ({
  image: {
    file: {
      hash: withProperty,
      size: withProperty,
      originName: withProperty,
      signature: withProperty,
      mimeType: withProperty,
    },
  },
});

const cmsPageMetaContentsQueryAdminUIOptionalFields = cmsPageMetaContentsQueryOptionalFieldsFactory(true);

const cmsPageMetaContentsQueryPlayerUIAffiliateUIOptionalFields = cmsPageMetaContentsQueryOptionalFieldsFactory(false);

export { cmsPageMetaContentsQueryAdminUIOptionalFields, cmsPageMetaContentsQueryPlayerUIAffiliateUIOptionalFields };
