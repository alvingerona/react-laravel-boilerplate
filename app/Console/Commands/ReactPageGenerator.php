<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

class ReactPageGenerator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'react:create-page {route} {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create react files for page.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $jsPath = base_path()  . "/resources/assets/js";
        $pagesPath = $jsPath . '/pages';
        $name = ucfirst($this->argument('name'));
        $route = ucfirst($this->argument('route'));
        $dirPath = $pagesPath . '/' . $route;
        $pagePath =  $dirPath . '/' . $name . '.jsx';
        $routePath = $dirPath . '/' . $route . 'Routes.jsx';
        $pageIndexPath = $pagesPath . '/index.js';

        if(!file_exists($dirPath))
        {
            $this->line('Creating directory.');
            File::makeDirectory($dirPath);
            $this->line('Directory created!');            
        }

        if(!file_exists($routePath))
        {
            $this->line('Creating route file.');
            File::put($routePath, $this->routeFileContents($route));
            File::chmod($routePath, 0755);
            $this->line('Route file created!');            
        }        

        if(file_exists($pagePath))
        {
            $this->error('Error: Page "' . $name . '" already exists!');
            return null;
        }

        $this->line('Creating page file.');
        File::put($pagePath, $this->pageFileContents($name));
        File::chmod($pagePath, 0755);

        /**
         * Append to pages/index.js
         */
//        File::append($pageIndexPath, $this->exportAppend($route, $name));

        $this->line('Page file created.');
    }

    private function exportAppend($route, $name)
    {
        return "export { " . $name . " } from './" . $route . "/" . $name . "'";
    }

    private function pageFileContents($name)
    {
        $name = ucfirst($name);

        return "import React from 'react'
import { connect } from 'react-redux'

import { CardDash } from 'components/Ui'
import { setDashboardTitle } from 'store/action-creators/page'

class PageComponent extends React.Component {
    componentDidMount() {
      this.props.setDashboardTitle('PAGE TITLE HERE')
    }
  
    render() {

      return (
        <CardDash md={12} title=\"CARD TITLE HERE\">

        </CardDash>
      )
    }
  }
  
  const mapStateToProps = state => {

    return {
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    setDashboardTitle: title => setDashboardTitle(dispatch, title)
  })
  
  export const {$name} = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageComponent)
";
    }

    public function routeFileContents($route)
    {
        $route = ucfirst($route);
        $componentName = $route . "RoutesComponent";

        return "import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

export class {$componentName} extends Component {

    render() {
        const {
            match: { url: currentUrl }
        } = this.props

        return (
            <Fragment>
                <Switch>
                    {/* START ROUTE GENERATOR */}


                    {/* END ROUTE GENERATOR */}
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {}
}
  
const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )({$componentName})
";
    }
}
