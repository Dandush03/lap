import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import CollapsableMenuItem from './MenuCollapsableItem';
import MenuNavItem from './MenuNavItem';

const MenuItem = ({
  menuItem, locale, Icon, classes, opened,
}) => {
  if (menuItem.length === 1) {
    return (
      <>
        <MenuNavItem
          menuItem={menuItem}
          locale={locale}
          Icon={Icon}
          classes={classes}
          opened={opened}
        />
      </>
    );
  }

  return (
    <>
      <CollapsableMenuItem
        menuItem={menuItem}
        locale={locale}
        Icon={Icon}
        classes={classes}
        opened={opened}
      />
    </>
  );
};

MenuItem.propTypes = {
  menuItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  locale: PropTypes.string.isRequired,
  Icon: PropTypes.objectOf(oneOfType([PropTypes.symbol, PropTypes.object])).isRequired,
  classes: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  opened: PropTypes.bool,
};

MenuItem.defaultProps = {
  opened: false,
};

export default MenuItem;
