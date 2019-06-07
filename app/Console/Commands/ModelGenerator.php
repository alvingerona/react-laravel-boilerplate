<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

/**
 * Sample command: php artisan develop:generator-model Breed
 */
class ModelGenerator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:model {model : Class name of the model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate base model, model scope and model relation file.';

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
        $model = $this->argument("model");
        $scope =  $model . "Scope";
        $relation =  $model . "Relation";
        $attributor = $model . "Attributor";

        $modelContents = $this->modelContents($model, $scope, $relation, $attributor);
        $modelPath = base_path("app/Models/" . $model . ".php");

        if(!file_exists($modelPath))
        {
            // Create model file.
            $file = fopen($modelPath, "w") or die("Unable to open file!");
            fwrite($file, $modelContents);
            fclose($file);
        }else{
            echo "Include this on your App\\Models\\".$model.".php " . PHP_EOL;
            echo $this->modelUse($scope, $relation, $attributor);
            echo PHP_EOL;
        }
        
        $scopeContents = $this->scopeContents($model, $scope);
        $scopePath = base_path("app/Models/Scopes/" . $scope . ".php");

        if(!file_exists($scopePath))
        {
            // Create scope file.
            $file = fopen($scopePath, "w") or die("Unable to open file!");
            fwrite($file, $scopeContents);
            fclose($file);

            File::chmod($scopePath, 0777);     
        }

        $relationContents = $this->relationContents($model, $relation);
        $relationPath = base_path("app/Models/Relations/" . $relation . ".php");

        if(!file_exists($relationPath))
        {
            // Create scope file.
            $file = fopen($relationPath, "w") or die("Unable to open file!");
            fwrite($file, $relationContents);
            fclose($file);

            File::chmod($relationPath, 0777);
        }      

        $attributorContents = $this->attributorContents($model, $attributor);
        $attributorPath = base_path("app/Models/Attributors/" . $attributor . ".php");

        if(!file_exists($attributorPath))
        {
            // Create scope file.
            $file = fopen($attributorPath, "w") or die("Unable to open file!");
            fwrite($file, $attributorContents);
            fclose($file);

            File::chmod($attributorPath, 0777);
        }            
    }

    protected function relationContents($model, $relation)
    {
    return '<?php
namespace App\Models\Relations;

/**
 * Relation trait for '. $model .' Model
 */
trait ' . $relation . '
{

}';
    }

    protected function scopeContents($model, $scope)
    {
    return '<?php
namespace App\Models\Scopes;

/**
 * Scope trait for '. $model .' Model
 */
trait ' . $scope . '
{

}';
    }

    protected function modelContents($model, $scope, $relation, $attributor)
    {
    return '<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
'.$this->modelUse($scope, $relation, $attributor).'

class '.$model.' extends Model
{
    use '.$scope.', '.$relation.', '.$attributor.';

    protected $table = ???;

    protected $fillable = [???];


}';
    }

    public function modelUse($scope, $relation, $attributor)
    {
return 'use App\Models\Scopes\\'.$scope.';
use App\Models\Relations\\'.$relation.';
use App\Models\Attributors\\'.$attributor.';';        
    }    

    protected function attributorContents($model, $attributor)
    {
    return '<?php
namespace App\Models\Attributors;

/**
 * Scope attributor for '. $model .' Model
 */
trait '.$attributor.'
{

}';
    }    
}
