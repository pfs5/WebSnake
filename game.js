/*
 * -------------------------------------------
 * Simple snake game.
 * 
 * 2019 (c) http://github.com/pfs5
 * 
 * -------------------------------------------
 */ 

// Globals
var screen_width = 50;
var screen_height = 40;
var screen_buffer = "";
var screen_matrix = null;
var game_period = 0.5;  // updates per sec

// Refs
var game_body_div = null;
var game_score_div = null;

// Locals
var pos_x = 25;
var pos_y = 20;
var snake_positions = [];
var score = 0;

// up down left right
var move_dir = "up"

function key_down(event)
{
    // Move left
    if (event.key == "ArrowLeft" || event.key == "a")
    {
        move_dir = "left";
    }

    // Move right
    if (event.key == "ArrowRight" || event.key == "d")
    {
        move_dir = "right";
    }

    // Move up
    if (event.key == "ArrowUp" || event.key == "w")
    {
        move_dir = "up";
    }

    // Move down
    if (event.key == "ArrowDown" || event.key == "s")
    {
        move_dir = "down"
    }

    refresh_screen();
}

function init_screen()
{
    screen_matrix = [];
    var x, y;
    for (y = 0; y < screen_height; y++)
    {
        var line = [];
        for (x = 0; x < screen_width; x++)
        {
            line.push('.');
        }
        screen_matrix.push(line);
    }   
}

function init_snake()
{
    var i;
    snake_len = 10;
    for (i = 1; i <= snake_len; i++)
    {
        snake_positions.push([pos_x, pos_y + snake_len - i]);
    }
}

function clear_screen()
{
    var x, y;
    for (y = 0; y < screen_height; y++)
    {
        for (x = 0; x < screen_width; x++)
        {
            if (y == 0 || y == screen_height - 1 ||
                x == 0 || x == screen_width - 1)
            {
                screen_matrix[y][x] = 'x';
            }
            else
            {
                screen_matrix[y][x] = '.';
            }
        }
    }   
}

function flush_screen_buffer()
{
    var x, y;
    screen_buffer = "";
    for (y = 0; y < screen_height; y++)
    {
        var line = "";
        for (x = 0; x < screen_width; x++)
        {
            line += screen_matrix[y][x];
        }
        line += "<br>";
        screen_buffer += line;
    }    
    
    game_body_div.innerHTML = screen_buffer;
}

function draw_snake()
{
    for (var i = 0; i < snake_positions.length; i++)
    {
        screen_matrix[snake_positions[i][1]][snake_positions[i][0]] = 'o';
    }
}

function refresh_screen()
{
    clear_screen();
    draw_snake();
    flush_screen_buffer();
}

function game_loop()
{
    move_snake();
    refresh_screen();
}

function move_snake()
{
    // Move head
    switch(move_dir)
    {
        case "up":
        {
            pos_y = Math.max(1, pos_y - 1);
            break;
        }
        case "down":
        {
            pos_y = Math.min(screen_height - 2, pos_y + 1);
            break;
        }
        case "left":
        {
            pos_x = Math.max(1, pos_x - 1);
            break;
        }
        case "right":
        {
            pos_x = Math.min(screen_width - 2, pos_x + 1);
            break;
        }
    }

    // Move body
    for (var i = 0; i < snake_positions.length - 1; i++)
    {
        snake_positions[i][0] = snake_positions[i + 1][0];
        snake_positions[i][1] = snake_positions[i + 1][1];
    }
    snake_positions[snake_positions.length - 1][0] = pos_x;
    snake_positions[snake_positions.length - 1][1] = pos_y;
}

function update_score()
{
    game_score_div.innerHTML = "Score: " + score;
}

function game()
{
    game_body_div = document.getElementById("game");
    game_score_div = document.getElementById("score");

    init_screen();
    init_snake();
    refresh_screen();
    update_score();

    setInterval(game_loop, game_period * 1000);
}

window.onload = game;
document.addEventListener('keydown', key_down);