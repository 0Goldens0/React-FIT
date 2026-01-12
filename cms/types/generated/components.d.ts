import type { Schema, Struct } from '@strapi/strapi';

export interface BrandCatalogCategory extends Struct.ComponentSchema {
  collectionName: 'components_brand_catalog_categories';
  info: {
    description: '1-\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430 \u0431\u0440\u0435\u043D\u0434\u0430';
    displayName: '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F (\u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u0431\u0440\u0435\u043D\u0434\u0430)';
  };
  attributes: {
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subcategories: Schema.Attribute.Component<
      'brand.catalog-subcategory',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BrandCatalogSubcategory extends Struct.ComponentSchema {
  collectionName: 'components_brand_catalog_subcategories';
  info: {
    description: '2-\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430 \u0431\u0440\u0435\u043D\u0434\u0430';
    displayName: '\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F (\u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u0431\u0440\u0435\u043D\u0434\u0430)';
  };
  attributes: {
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    types: Schema.Attribute.Component<'brand.catalog-type', true>;
    url: Schema.Attribute.String;
  };
}

export interface BrandCatalogType extends Struct.ComponentSchema {
  collectionName: 'components_brand_catalog_types';
  info: {
    description: '3-\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430 \u0431\u0440\u0435\u043D\u0434\u0430';
    displayName: '\u0422\u0438\u043F \u0442\u043E\u0432\u0430\u0440\u0430 (\u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u0431\u0440\u0435\u043D\u0434\u0430)';
  };
  attributes: {
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface BrandPopularProduct extends Struct.ComponentSchema {
  collectionName: 'components_brand_popular_products';
  info: {
    description: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0442\u043E\u0432\u0430\u0440\u0430 \u0434\u043B\u044F \u0441\u0435\u043A\u0446\u0438\u0438 \u00AB\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B\u00BB \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0431\u0440\u0435\u043D\u0434\u0430';
    displayName: '\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439 \u0442\u043E\u0432\u0430\u0440 (\u0431\u0440\u0435\u043D\u0434)';
  };
  attributes: {
    article: Schema.Attribute.String;
    category: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    price: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface HomeClientServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_home_client_service_cards';
  info: {
    description: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 (front/back) \u0434\u043B\u044F \u0441\u0435\u043A\u0446\u0438\u0438 \u00AB\u041A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0439 \u0441\u0435\u0440\u0432\u0438\u0441\u00BB \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u043E\u0439';
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u043E\u0433\u043E \u0441\u0435\u0440\u0432\u0438\u0441\u0430';
  };
  attributes: {
    backText: Schema.Attribute.Blocks;
    frontText: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    iconName: Schema.Attribute.Enumeration<
      [
        'dashboard',
        'monitor',
        'user',
        'zap',
        'flag',
        'truck',
        'settings',
        'social',
      ]
    >;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HonestSignBulletItem extends Struct.ComponentSchema {
  collectionName: 'components_honest_sign_bullet_items';
  info: {
    description: 'Single bullet/list item for Honest Sign page';
    displayName: 'Bullet item';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HonestSignPackagingCard extends Struct.ComponentSchema {
  collectionName: 'components_honest_sign_packaging_cards';
  info: {
    description: "Card for '\u041F\u0440\u043E\u0434\u0443\u043C\u0430\u043D\u043D\u0430\u044F \u0444\u0438\u0440\u043C\u0435\u043D\u043D\u0430\u044F \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0430' section";
    displayName: 'Packaging card';
  };
  attributes: {
    badge: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LogisticsFeatureTag extends Struct.ComponentSchema {
  collectionName: 'components_logistics_feature_tags';
  info: {
    description: '';
    displayName: '\u0422\u0435\u0433 (\u0444\u0438\u0447\u0430)';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LogisticsSpecItem extends Struct.ComponentSchema {
  collectionName: 'components_logistics_spec_items';
  info: {
    description: '';
    displayName: '\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0430 (\u0411\u0435\u043B\u044B\u0439 \u0420\u0430\u0441\u0442)';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LogisticsStatItem extends Struct.ComponentSchema {
  collectionName: 'components_logistics_stat_items';
  info: {
    description: '';
    displayName: '\u0426\u0438\u0444\u0440\u0430 (Hero)';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['default', 'highlight', 'highlightAlt']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface LogisticsWarehouse extends Struct.ComponentSchema {
  collectionName: 'components_logistics_warehouses';
  info: {
    description: '';
    displayName: '\u0421\u043A\u043B\u0430\u0434';
  };
  attributes: {
    address: Schema.Attribute.String & Schema.Attribute.Required;
    city: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    status: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442'>;
  };
}

export interface LogisticsWmsCard extends Struct.ComponentSchema {
  collectionName: 'components_logistics_wms_cards';
  info: {
    description: '';
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 (WMS/\u043F\u0440\u043E\u0435\u043A\u0442\u044B)';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    iconVariant: Schema.Attribute.Enumeration<['green', 'yellow']> &
      Schema.Attribute.DefaultTo<'green'>;
    tags: Schema.Attribute.Component<'logistics.feature-tag', true>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MarketingActivitySection extends Struct.ComponentSchema {
  collectionName: 'components_marketing_activity_sections';
  info: {
    description: '\u0421\u0435\u043A\u0446\u0438\u044F \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u00AB\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C\u00BB';
    displayName: '\u0421\u0435\u043A\u0446\u0438\u044F \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u043E\u0439 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    layout: Schema.Attribute.Enumeration<['textLeft', 'textRight']> &
      Schema.Attribute.DefaultTo<'textLeft'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'brand.catalog-category': BrandCatalogCategory;
      'brand.catalog-subcategory': BrandCatalogSubcategory;
      'brand.catalog-type': BrandCatalogType;
      'brand.popular-product': BrandPopularProduct;
      'home.client-service-card': HomeClientServiceCard;
      'honest-sign.bullet-item': HonestSignBulletItem;
      'honest-sign.packaging-card': HonestSignPackagingCard;
      'logistics.feature-tag': LogisticsFeatureTag;
      'logistics.spec-item': LogisticsSpecItem;
      'logistics.stat-item': LogisticsStatItem;
      'logistics.warehouse': LogisticsWarehouse;
      'logistics.wms-card': LogisticsWmsCard;
      'marketing-activity.section': MarketingActivitySection;
    }
  }
}
